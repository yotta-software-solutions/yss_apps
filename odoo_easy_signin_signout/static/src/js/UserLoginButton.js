odoo.define('odoo_easy_signin_signout.UserLoginButton', function (require) {
"use strict";
    var core = require('web.core');
    var Widget = require('web.Widget');
    var SystrayMenu = require('web.SystrayMenu');
    var _t = core._t;

    var UserLoginButton = Widget.extend({
        template: 'UserLoginButton',
        events: {
            'click a.easy_sign_in_out': '_onLoginLogoutClick',
        },
        init: function(parent, context) {
            this._super(parent, context);
            this.employee_id = false;
        },
        start: function () {
            var self = this;
            return this._rpc({
                model: 'hr.employee',
                method: 'search_read',
                context: self.getSession().user_context,
                domain: [['user_id', '=', this.getSession().uid]],
                fields: ['id', 'attendance_state'],
            })
            .then(function(result) {
                self.employee_id = result[0].id;
                self.attendance_state = result[0].attendance_state;
                var sign_in_out_icon = self.$('#easy_sign_in_out_icon');
                var icon_color = self.$('.easy_sign_in_out');
                var attendance_state = 'checked_out';
                if(result[0].attendance_state == "checked_out"){
                    attendance_state = "checked_in";
                }
                var message = ''
                if (attendance_state == 'checked_in'){
                    sign_in_out_icon.removeClass('fa-sign-out');
                    icon_color.removeClass('oe_red_color')
                    sign_in_out_icon.addClass('fa-sign-in');
                    icon_color.addClass('oe_green_color')
                }
                else if (attendance_state == 'checked_out'){
                    sign_in_out_icon.removeClass('fa-sign-in');
                    icon_color.removeClass('oe_green_color')
                    sign_in_out_icon.addClass('fa-sign-out');
                    icon_color.addClass('oe_red_color')
                }
            });
        },
        _onLoginLogoutClick: function () {
            var self = this;
            var url = window.location.href;
            self._rpc({
                model: 'hr.employee',
                method: 'attendance_manual',
                args: [[self.employee_id], 'hr_attendance.hr_attendance_action_my_attendances'],
            })
            .then(function(result) {
                window.open([url],"_self");
                var sign_in_out_icon = self.$('#easy_sign_in_out_icon');
                var icon_color = self.$('.easy_sign_in_out');
                var attendance_state = 'checked_out';
                if(result['action']['attendance']['check_out']){
                    attendance_state = "checked_in";
                }
                var message = ''
                if (attendance_state == 'checked_in'){
                    sign_in_out_icon.removeClass('fa-sign-out');
                    icon_color.removeClass('oe_red_color')
                    sign_in_out_icon.addClass('fa-sign-in');
                    icon_color.addClass('oe_green_color')
                    message = 'Checked Out'
                }
                else if (attendance_state == 'checked_out'){
                    sign_in_out_icon.removeClass('fa-sign-in');
                    icon_color.removeClass('oe_green_color')
                    sign_in_out_icon.addClass('fa-sign-out');
                    icon_color.addClass('oe_red_color')
                    message = 'Checked In'
                }
                self.trigger_up('show_effect', {
                    message: _t("Successfully " + message),
                    type: 'rainbow_man'
                });
            });
        },
    });
    SystrayMenu.Items.push(UserLoginButton);
    return UserLoginButton;
});
