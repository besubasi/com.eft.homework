Ext.define('App.Model.Client', {
    extend: 'Ext.data.Model',
    fields: [{name: 'id',type: 'int', useNull: true}, 'number','billingFirstName','billingLastName','email','expiryMonth','expiryYear','birthday','billingCity']
});

var storeClient =  Ext.create('Ext.data.Store', {
    autoLoad: false,
    autoSync: true,
    model: 'App.Model.Client',
    proxy: {
        type: 'rest',
        url: 'client',
        method: 'POST',
        reader: {
            type: 'json',
            rootProperty: 'customerInfo'
        }
    }
});



var gridClient = Ext.create('Ext.grid.Panel', {
    region: 'center',
    split: true,
    width: 500,
    height: 330,
    frame: true,
    closable:true,
    title: 'Client',
    store: storeClient,
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
        text: 'Number',
        width: 50,
        sortable: true,
        dataIndex: 'number',
        renderer: function(v, meta, rec) {
            return rec.phantom ? '' : v;
        }
    }, {
        text: 'Billing First Name',
        flex: 1,
        sortable: true,
        dataIndex: 'billingFirstName',
        field: {
            xtype: 'textfield'
        }
    }, {
        header: 'Billing Last Name',
        width: 120,
        sortable: true,
        dataIndex: 'billingLastName',
        field: {
            xtype: 'textfield'
        }
    }, {
        text: 'Email',
        width: 120,
        sortable: true,
        dataIndex: 'email',
        field: {
            xtype: 'textfield'
        }
    }, {
        text: 'Expiry Month',
        width: 120,
        sortable: true,
        dataIndex: 'expiryMonth',
        field: {
            xtype: 'textfield'
        }
    }, {
        text: 'Expiry Year',
        width: 120,
        sortable: true,
        dataIndex: 'email',
        field: {
            xtype: 'expiryYear'
        }
    }, {
        text: 'Birth day',
        width: 120,
        sortable: true,
        dataIndex: 'birthday',
        field: {
            xtype: 'textfield'
        }
    }, {
        text: 'Billing City',
        width: 120,
        sortable: true,
        dataIndex: 'billingCity',
        field: {
            xtype: 'textfield'
        }
    }]
});    


var formClient = Ext.create('Ext.form.Panel', {
	region: 'north',
	bodyStyle:'padding:3px',
	frame: true,
	title: '',
	autoHeight:true,
	autoScroll : true,
	anchor: '100%',
	collapsible:true,
	border: false,
	buttons: [
        {
            text: 'Search',
            handler: function() {
            	storeClient.proxy.extraParams = formClient.getForm().getValues();
            	storeClient.reload();
            }
        }
    ],
    items: [{
        title: 'Arama Kriterleri',
        xtype: 'fieldset',
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


var containerClient = Ext.create('Ext.container.Container',{
    region: 'center',
    layout: 'border',   
    autoEl: {},
    items: [formClient,gridClient]
});


function getClientTab(){

	var tab = Ext.create('Ext.panel.Panel', {
		name: 'client',
		title:'Client',
		layout: 'fit',
		closable: true,
		listeners: {
			beforeclose: function(t) {
				var tabPanel = Ext.getCmp('tabPanel');
				tabPanel.items.remove(t);
			}
		},
		items:[containerClient]
	});
	
	return tab;
}
