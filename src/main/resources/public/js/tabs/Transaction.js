Ext.define('App.Model.Transaction', {
    extend: 'Ext.data.Model',
    fields: [{name: 'originalAmount', mapping : 'fx.merchant.originalAmount',type: 'int'},
    	     {name :'originalCurrency', mapping : 'fx.merchant.originalCurrency'}, 
    	     {name :'status', mapping : 'transaction.merchant.status'},
    	     {name :'merchantname', mapping : 'merchant.name'},
    	     {name :'email', mapping : 'customerInfo.email'},
    	     {name :'message', mapping : 'transaction.merchant.message'}
    ]
});

var storeTransaction =  Ext.create('Ext.data.Store', {
    autoLoad: false,
    autoSync: true,
    model: 'App.Model.Transaction',
    proxy: {
        type: 'rest',
        url: 'transaction',
        method: 'POST',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    }
});



var gridTransaction = Ext.create('Ext.grid.Panel', {
    region: 'center',
    split: true,
    width: 500,
    height: 330,
    frame: true,
    closable:true,
    title: 'Transaction Detail',
    store: storeTransaction,
    columns: [{
        text: 'Original Amount',
        width: 100,
        sortable: true,
        dataIndex: 'originalAmount',
        align: 'right'
      }, {
        text: 'Original Currency',
        width: 120,
        sortable: true,
        dataIndex: 'originalCurrency'
      }, {
        text: 'Status',
        width: 120,
        sortable: true,
        dataIndex: 'status'
      }, {
           text: 'Dev Merchant Name',
           width: 120,
           sortable: true,
           dataIndex: 'merchantname'
      }, {
          text: 'Customer Email',
          width: 120,
          sortable: true,
          dataIndex: 'email'
     }, {
         text: 'Message',
         width: 120,
         sortable: true,
         dataIndex: 'message',
         flex: 1
    }]
});    


var formTransaction = Ext.create('Ext.form.Panel', {
	region: 'north',
	bodyStyle:'padding:3px',
	frame: true,
	monitorValid:true,
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
            	storeTransaction.proxy.extraParams = formTransaction.getForm().getValues();
            	storeTransaction.reload();
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


var containerTransaction = Ext.create('Ext.container.Container',{
    region: 'center',
    layout: 'border',   
    autoEl: {},
    items: [formTransaction,gridTransaction]
});


function getTransactionTab(){

	var tab = Ext.create('Ext.panel.Panel', {
		name: 'transaction',
		title:'Transaction',
		layout: 'fit',
		closable: true,
		listeners: {
			beforeclose: function(t) {
				var tabPanel = Ext.getCmp('tabPanel');
				tabPanel.items.remove(t);
			}
		},
		items:[containerTransaction]
	});
	
	return tab;
}
