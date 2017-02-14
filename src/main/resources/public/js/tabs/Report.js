Ext.define('App.Model.Report', {
    extend: 'Ext.data.Model',
    fields: [{name: 'count',type: 'int'},
    		 {name: 'total',type: 'int'}, 'currency']
});



var storeReport =  Ext.create('Ext.data.Store', {
    autoLoad: false,
    autoSync: true,
    model: 'App.Model.Report',
    proxy: {
        type: 'rest',
        url: 'report',
        method: 'POST',
        reader: {
            type: 'json',
            rootProperty: 'response'
        }
    }
});



var gridReport = Ext.create('Ext.grid.Panel', {
    region: 'center',
    split: true,
    width: 500,
    height: 330,
    frame: true,
    closable:true,
    title: 'Report Detail',
    store: storeReport,
    columns: [{
        text: 'Count',
        width: 75,
        sortable: true,
        dataIndex: 'count',
        align: 'right'
      }, {
          text: 'Total',
          width: 75,
          sortable: true,
          dataIndex: 'total',
          align: 'right',
          renderer: function(value) {
        	  return Ext.util.Format.number(value, '0,0.00');
          }
      }, {
        text: 'Currency',
        width: 75,
        sortable: true,
        dataIndex: 'currency'
      }]
});    


var formReport = Ext.create('Ext.form.Panel', {
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
            	storeReport.proxy.extraParams = formReport.getForm().getValues();
            	storeReport.reload();
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
        	     items: [{
        	         xtype: 'datefield',
        	         anchor: '100%',
        	         fieldLabel: 'From',
        	         name: 'fromDate',
        	         allowBlank:false,
        	         value: new Date(new Date().setDate(new Date().getDate()-30)),
        	         format: 'Y-m-d'
        	     }, {
        	         xtype: 'datefield',
        	         anchor: '100%',
        	         fieldLabel: 'To',
        	         name: 'toDate',
        	         allowBlank:false,
        	         value: new Date(),
        	         format: 'Y-m-d'
        	     }]
    		},
        	{
        	     layout: 'form',
        	     border: false,
        	     columnWidth: 0.5,
        	     items: [{
        	    	xtype: 'numberfield',
	                fieldLabel:'Merchant', 
	                name:'merchant',
	                width:75,
	                minValue: 0,
	                maxValue: 99,
	                hideTrigger: true,
	                keyNavEnabled: false,
	                mouseWheelEnabled: false
	            },{
        	    	xtype: 'numberfield',
	                fieldLabel:'Acquirer', 
	                name:'acquirer',
	                width:75,
	                minValue: 0,
	                maxValue: 99,
	                hideTrigger: true,
	                keyNavEnabled: false,
	                mouseWheelEnabled: false
	                
	            }]
        	}
        ]
    }]

});	


var containerReport = Ext.create('Ext.container.Container',{
    region: 'center',
    layout: 'border',   
    autoEl: {},
    items: [formReport,gridReport]
});


function getReportTab(){

	var tab = Ext.create('Ext.panel.Panel', {
		name: 'report',
		title:'Report',
		layout: 'fit',
		closable: true,
		listeners: {
			beforeclose: function(t) {
				var tabPanel = Ext.getCmp('tabPanel');
				tabPanel.items.remove(t);
			}
		},
		items:[containerReport]
	});
	
	return tab;
}
