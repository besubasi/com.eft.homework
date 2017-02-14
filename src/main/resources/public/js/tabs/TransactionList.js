
Ext.define('App.Model.TransactionList', {
    extend: 'Ext.data.Model',
    fields: [{name: 'originalAmount', mapping : 'fx.merchant.originalAmount',type: 'int'},
		     {name :'originalCurrency', mapping : 'fx.merchant.originalCurrency'},
		     {name: 'convertedAmount', mapping : 'fx.merchant.convertedAmount',type: 'int'},
		     {name :'convertedCurrency', mapping : 'fx.merchant.convertedCurrency'},
		     
		     {name: 'acquirerId', mapping : 'acquirer.id',type: 'int'},
		     {name :'acquirerName', mapping : 'acquirer.name'},
		     
		     {name :'billingFirstName', mapping : 'customerInfo.billingFirstName'},
		     {name :'billingLastName', mapping : 'customerInfo.billingLastName'},
		     {name :'email', mapping : 'customerInfo.email'},
		     
		     {name: 'merchantId', mapping : 'merchant.id',type: 'int'},
		     {name :'merchantName', mapping : 'merchant.name'},
		     
		     {name :'status', mapping : 'ipn.merchant.status'},
		     {name :'transactionId', mapping : 'ipn.merchant.transactionId'},
		     {name: 'date', mapping : 'ipn.merchant.date',type: 'int'}
	     ]
});



var storeTransactionList =  Ext.create('Ext.data.Store', {
    autoLoad: false,
    autoSync: true,
    model: 'App.Model.TransactionList',
    proxy: {
        type: 'rest',
        url: 'transactionList',
        method: 'POST',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});



var gridTransactionList = Ext.create('Ext.grid.Panel', {
    region: 'center',
    split: true,
    width: 500,
    height: 330,
    frame: true,
    closable:true,
    title: 'Transaction List',
    store: storeTransactionList,
    columns: [
		{text: 'originalAmount',dataIndex: 'originalAmount', width: 75,sortable: true, align: 'right'},
		{text: 'originalCurrency',dataIndex: 'originalCurrency', width: 75,sortable: true},
		{text: 'convertedAmount',dataIndex: 'convertedAmount', width: 75,sortable: true, align: 'right'},
		{text: 'convertedCurrency',dataIndex: 'convertedCurrency', width: 75,sortable: true},
		{text: 'acquirerId',dataIndex: 'acquirerId', width: 75,sortable: true, align: 'right'},
		{text: 'acquirerName',dataIndex: 'acquirerName', width: 75,sortable: true},
		{text: 'billingFirstName',dataIndex: 'billingFirstName', width: 75,sortable: true},
		{text: 'billingLastName',dataIndex: 'billingLastName', width: 75,sortable: true},
		{text: 'email',dataIndex: 'email', width: 75,sortable: true},
		{text: 'merchantId',dataIndex: 'merchantId', width: 75,sortable: true, align: 'right'},
		{text: 'merchantName',dataIndex: 'merchantName', width: 75,sortable: true},
		{text: 'status',dataIndex: 'status', width: 75,sortable: true},
		{text: 'transactionId',dataIndex: 'transactionId', width: 75,sortable: true},
		{text: 'date',dataIndex: 'date', width: 75,sortable: true, align: 'right',
			renderer: function(value) {
				return Ext.Date.format(new Date(value), 'm/d/Y g:i A');
			}
		}
	]
});    


var formTransactionList = Ext.create('Ext.form.Panel', {
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
            	storeTransactionList.proxy.extraParams = formTransactionList.getForm().getValues();
            	storeTransactionList.reload();
            }
        }
    ],
    items: [{
        title: 'Arama Kriterleri',
        xtype: 'fieldset',
        autoHeight: true,
        layout: 'column',
        items: [{
					layout: 'form',
					border: false,
					columnWidth: 0.5,
					items: [
						{xtype: 'datefield',anchor: '100%',fieldLabel: 'From',name: 'fromDate',width:75,format: 'Y-m-d',value: new Date(new Date().setDate(new Date().getDate()-30))},
						{xtype: 'datefield',anchor: '100%',fieldLabel: 'To',name: 'toDate',width:75,format: 'Y-m-d',value: new Date()},
						{xtype: 'numberfield',fieldLabel:'Merchant',name:'merchantId',width:50,minValue: 0,maxValue: 99,hideTrigger: true,keyNavEnabled: false,mouseWheelEnabled: false},
						{xtype: 'numberfield',fieldLabel:'Acquirer',name:'acquirerId',width:50,minValue: 0,maxValue: 99,hideTrigger: true,keyNavEnabled: false,mouseWheelEnabled: false}
					]
    			},
    			{
					layout: 'form',
					border: false,
					columnWidth: 0.5,
					items: [
						{xtype: 'textfield',anchor: '100%',fieldLabel: 'Status',name: 'status',width:75},
						{xtype: 'textfield',anchor: '100%',fieldLabel: 'Payment Method',name: 'paymentMethod',width:150},
						{xtype: 'textfield',anchor: '100%',fieldLabel: 'Operation',name: 'operation',width:150}
					]
        	}
        ]
    }]

});	

/*
		String fromDate = request.getParameter("fromDate");
		String toDate = request.getParameter("toDate");
		String status = request.getParameter("status");
		String paymentMethod = request.getParameter("paymentMethod");
		String errorCode = request.getParameter("errorCode");
		//String page = request.getParameter("page");
		String merchant = request.getParameter("merchantId");
		String acquirer = request.getParameter("acquirerId"); * */


var containerTransactionList = Ext.create('Ext.container.Container',{
    region: 'center',
    layout: 'border',   
    autoEl: {},
    items: [formTransactionList,gridTransactionList]
});


function getTransactionListTab(){

	var tab = Ext.create('Ext.panel.Panel', {
		name: 'transactionList',
		title:'TransactionList',
		layout: 'fit',
		closable: true,
		listeners: {
			beforeclose: function(t) {
				var tabPanel = Ext.getCmp('tabPanel');
				tabPanel.items.remove(t);
			}
		},
		items:[containerTransactionList]
	});
	
	return tab;
}
