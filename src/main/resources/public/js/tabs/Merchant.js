Ext.define('App.Model.Merchant', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id',type: 'int', useNull: true},{name: 'parentId',type: 'int', useNull: true}, 'name', 'ipnUrl', 'descriptor','address']
});



var storeMerchant = Ext.create('Ext.data.Store', {
    autoLoad: false,
    autoSync: true,
    model: 'App.Model.Merchant',
    proxy: {
        type: 'rest',
        url: 'merchant',
        method: 'POST',
        reader: {
            type: 'json',
            rootProperty: 'merchant'
        }
    }
});



var gridMerchant = Ext.create('Ext.grid.Panel', {
    //renderTo: document.body,
    id :'gridMerchant',
    region: 'center',
    split: true,
    width: 500,
    height: 330,
    frame: true,
    closable:true,
    title: 'Merchant',
    store: storeMerchant,
    //iconCls: 'icon-user',
    viewConfig: {
        //forceFit: true,
        //autoFill: true,
        getRowClass: function(record, rowIndex, p, store) {
        	
        }
    },
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



var formMerchant =  Ext.create('Ext.form.Panel', {
	id:'searchForm',
	region: 'north', bodyStyle:'padding:3px',frame: true, title: '',
	autoHeight:true,
	autoScroll : true,
	anchor: '100%',
	collapsible:true,
	border: false,
	buttons: [
        {
            text: 'Search',
            handler: function() {
            	
            	storeMerchant.proxy.extraParams = formMerchant.getForm().getValues();
            	storeMerchant.reload();

            }
        }
    ],
    items: [{
        xtype: 'fieldset',
        title: 'Arama Kriterleri',
        autoHeight: true,
        layout: 'column',
        items: [
        	{
        	     layout: 'form',
        	     border: false,
        	     columnWidth: 0.5,
        	     items: [{
        	    	xtype: 'textfield',
	                fieldLabel:'Transaction Id', 
	                name:'transactionId',
	                width:200,
	                allowBlank:false
	            }]
        	},
        	{
        	     layout: 'form',
        	     border: false,
        	     columnWidth: 0.5,
        	     items: []
        	}
        ]
    }]

});	



var containerMerchant = Ext.create('Ext.container.Container',{
    region: 'center',
    layout: 'border',   
    autoEl: {},
    items: [formMerchant, gridMerchant]
});


function getMerchantTab(){

	var tab = Ext.create('Ext.panel.Panel', {
		name: 'merchant',
		title:'Merchant',
		layout: 'fit',
		closable: true,
		listeners: {
			beforeclose: function(t) {
				var tabPanel = Ext.getCmp('tabPanel');
				tabPanel.items.remove(t);
			}
		},
		items:[containerMerchant]
	});
	
	return tab;
}
