Ext.require(['Ext.data.*', 'Ext.grid.*', 'Ext.form.*']);



Ext.define('Merchant', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id',type: 'int', useNull: true},{name: 'parentId',type: 'int', useNull: true}, 'name', 'ipnUrl', 'descriptor','address']
});

Ext.onReady(function(){

	var pageName = 'Merchant';

    var storeMerchant = Ext.create('Ext.data.Store', {
        autoLoad: false,
        autoSync: true,
        model: 'Merchant',
        proxy: {
            type: 'rest',
            url: 'merchant',
            reader: {
                type: 'json',
                rootProperty: 'merchant'
            }
        }
    });
    
    var gridMerchant = Ext.create('Ext.grid.Panel', {
        //renderTo: document.body,
        id :'grid'+pageName,
        region: 'center',
        layout:'fit',
        width: 500,
        height: 330,
        frame: true,
        closable:true,
        title: 'Merchant',
        store: storeMerchant,
        //iconCls: 'icon-user',
        columns: [{
            text: 'ID',
            width: 50,
            sortable: true,
            dataIndex: 'id',
            renderer: function(v, meta, rec) {
                return rec.phantom ? '' : v;
            }
        },{
            text: 'Parent ID',
            width: 50,
            sortable: true,
            dataIndex: 'parentId',
            renderer: function(v, meta, rec) {
                return rec.phantom ? '' : v;
            }
        }, {
            text: 'Name',
            flex: 1,
            sortable: true,
            dataIndex: 'name',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'IpnUrl',
            width: 120,
            sortable: true,
            dataIndex: 'ipnUrl',
            field: {
                xtype: 'textfield'
            }
        }, {
            text: 'Descriptor',
            width: 120,
            sortable: true,
            dataIndex: 'descriptor',
            field: {
                xtype: 'textfield'
            }
        }, {
            text: 'Address',
            width: 120,
            sortable: true,
            dataIndex: 'address',
            field: {
                xtype: 'textfield'
            }
        }]
    });
    

	var sformMerchant = Ext.create('Ext.form.FormPanel', {
		id:'sform'+pageName,
		region: 'north', bodyStyle:'padding:3px',frame: true, title: '',
		autoHeight:true,
		autoScroll : true,
		anchor: '100%',
		collapsible:true,
		border: false,
		keys:{key:13,fn:gridMerchant.store.reload,scope:gridMerchant.store},
	    items: [{
	        xtype: 'fieldset',
	        title: 'Search Criteria',
	        autoHeight: true,
	        layout: 'column',
	        items: [
	        	{
	        		id : 'transactionId',
	                fieldLabel:'Transaction Id', 
	                name:'transactionId',
	                allowBlank:false
	            }
	        ]
	    }]

	});    
    
    gridMerchant.store.on('beforeload',function(a,b){
    	a.baseParams = sformMerchant.getForm().getValues(); 
    });

    gridMerchant.store.on('load',function(a,b){
    	if(a.totalLength==0)return;
    	var sm=gridMerchant.getSelectionModel();
    	if(!sm.hasSelection())
    		sm.selectFirstRow();

    });


	var container = Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [sformMerchant, gridMerchant]
	});

	var panel = Ext.create('Ext.panel.Panel',{
		id:'tab'+pageName,
	    title: 'Merchant',
	    closable: true,
	    layout: 'fit',
	    items: container/*,
	    listeners: {
	    	 activate: function(tab, eOpts) {
	         	gridMerchant.store.reload();
	         }
	    }*/
	});


});


/*
{  
   "merchant":{  
      "id":3,
      "parentId":null,
      "name":"Dev-Merchant",
      "3dStatus":"ALL",
      "mcc":"6012",
      "ipnUrl":"https:\/\/testcheckout.clearsettle.com\/ipn",
      "apiKey":"b5c946997663e1356542fd966167bbae",
      "cpgKey":null,
      "type":"ECOM",
      "descriptor":"GpaySafe.com Voucher|London",
      "secretKey":"1234",
      "allowPartialRefund":false,
      "allowPartialCapture":true,
      "allowDynamicDescriptor":true,
      "avsCheck":false,
      "walletId":"",
      "createDate":"2015-08-07 11:41:59",
      "disable":false,
      "address":"32 LONDON BRIDGE STREET ",
      "postcode":"SE1 9SG",
      "country":"GB",
      "comType":"API"
   }
}
 * 
 * */    
