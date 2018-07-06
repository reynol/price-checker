# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Prices(models.Model):

     _name = 'pricechecker.price'

     name = fields.Char()


#     @api.depends('value')
#     def _value_pc(self):
#         self.value2 = float(self.value) / 100
