# -*- coding: utf-8 -*-
###################################################################################
#
#    Yotta Software Solutions
#    Copyright (C) 2020-TODAY Yotta Software Solutions (<https://yottasoftwaresolutions.com>).
#
#    This program is free software: you can modify
#    it under the terms of the GNU Affero General Public License (AGPL) as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
###################################################################################
{
    'name': 'Odoo Easy Signin Signout',
    'version': '14.0.1.0.0',
    'summary': 'Allow user to login logout easily',
    'description': """
        Allow user to login logout easily without going in attendance.
        """,
    'category': 'Generic Modules/Human Resources',
    'author': "Yotta Software Solutions",
    'company': 'Yotta Software Solutions',
    'maintainer': 'Yotta Software Solutions',
    'website': "https://yottasoftwaresolution.com/",
    'price': '10',
    "currency": 'EUR',
    'depends': [
       'hr_attendance',
    ],
    'data': [
        'views/webclient_templates.xml',
    ],
    "qweb": [
        'static/src/xml/*.xml',
    ],
    'images': [
        'static/description/images/odoo_easy_signin_signout_banner.png',
    ],
    'sequence': 1,
    'license': 'OPL-1',
    'installable': True,
    'auto_install': False,
    'application': False,
}
