# -*- coding: utf-8 -*-
from odoo import http

# class Pricechecker(http.Controller):
#     @http.route('/pricechecker/pricechecker/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pricechecker/pricechecker/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pricechecker.listing', {
#             'root': '/pricechecker/pricechecker',
#             'objects': http.request.env['pricechecker.pricechecker'].search([]),
#         })

#     @http.route('/pricechecker/pricechecker/objects/<model("pricechecker.pricechecker"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pricechecker.object', {
#             'object': obj
#         })


# -*- coding: utf-8 -*-
from odoo import http
import logging
from json import dumps, loads, JSONEncoder, JSONDecoder
import json

_logger = logging.getLogger(__name__)

class Academy(http.Controller):
    @http.route('/price/check/', auth='public', website=True)
    def index(self, **kw):
        context = {
            'session_info': json.dumps(http.request.env['ir.http'].session_info())
        }
        return http.request.render('pricechecker.index', qcontext=context)

    @http.route('/get/products/', type='json', methods=['POST','GET'], auth='public')
    def getProduc(self, **kw):
        _logger.info('CONNECTION SUCCESSFUL 4')
        Product = http.request.env['product.product']
        records = Product.search([])
        return getjson(records)

    @http.route('/update/products/', type='json', methods=['POST', 'GET'], auth='public')
    def updateProduc(self, **kw):
        _logger.info(kw)
        barcode = (kw['params'])['barcode']
        price = (kw['params'])['price']
        name = (kw['params'])['name']
        standard_price = (kw['params'])['standard_price']
        _logger.info(barcode)
        _logger.info("el precio:"+price)
        Product = http.request.env['product.product']
        product_id = Product.search([['barcode', '=', barcode]])
        #Product.write([product_id], {'list_price': 6500.00})
        product_id.write({'name': name, 'list_price': price, 'standard_price': standard_price, 'barcode': barcode})
        partner = Product.browse(product_id)
        #partner.list_price = 6500
        #print dir(partner)
        return getjson(product_id)

    @http.route('/create/products/', type='json', methods=['POST', 'GET'], auth='public')
    def createProduc(self, **kw):
        _logger.info(kw)
        barcode = (kw['params'])['barcode']
        price = (kw['params'])['price']
        name = (kw['params'])['name']
        standard_price = (kw['params'])['standard_price']
        _logger.info(barcode)
        _logger.info("el precio:"+price)
        Product = http.request.env['product.product']
        product_id = Product.create({'name': name, 'list_price': price, 'standard_price': standard_price, 'barcode': barcode})
        return getjson(product_id)

def getjson(products):
    records = {}
    for element in products:
       # print dir(element)
        value = {}
        value['display_name'] = element.display_name
        value['name'] = element.name
        value['price'] = element.list_price
        value['standard_price'] = element.standard_price
        value['price2'] = element.price

        #record = {}
       # record['lst_price'] = element.lst_price
       # record['barcode'] = element.barcode
        records[element.barcode] = value
      #  records.append(record)
        _logger.info(element.barcode)


    print records
    return json.dumps(records)

#select * from product_template;
#     @http.route('/academy/academy/objects/', auth='public')
#     def list(self, **kw):
