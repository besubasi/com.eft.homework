Ext.application({
    name: 'App',
    launch: function() {
    	
		var treeStore = Ext.create('Ext.data.TreeStore', {
		    root: {
		        expanded: true,
		        children: [
		            { text: 'Menü List', expanded: true, children: [
		                { text: 'Transaction List', leaf: true, tab : 'transactionList'},
		                { text: 'Transaction Detail', leaf: true, tab : 'transaction'},
		                { text: 'Merchant', leaf: true, tab : 'merchant'},
		                { text: 'Client', leaf: true, tab : 'client'}
		            ] },
		            { text: 'Reports', expanded: false, children: [
		                { text: 'Report', leaf: true, tab : 'report'}
		            ] }	            
		        ]
		    }
		});
	
		var tree = Ext.create('Ext.tree.Panel', {
		    title: 'ClearSettle Action',
		    width: 200,
		    height: 200,
		    store: treeStore,
		    rootVisible: false,
		    region: 'west',
		    listeners: {
		    	itemclick: function(view, record, item, index, e) {
	            	if(record.data.leaf == true){
	            		var tabPanel = Ext.getCmp('tabPanel');
						var tab = null;
						
						Ext.each(tabPanel.items.items, function(item) {
							if(item.name == record.data.tab){
								tab = item;
								return;
							}
						});
						
						if(tab == null){
	
							if(record.data.tab == 'transactionList'){
								tab = getTransactionListTab();							
							}else if(record.data.tab == 'transaction'){
								tab = getTransactionTab();							
							}else if(record.data.tab == 'client'){
								tab = getClientTab();
							}else if(record.data.tab == 'merchant'){
								tab = getMerchantTab();							
							}else if(record.data.tab == 'report'){
								tab = getReportTab();							
							}
	
							tabPanel.add(tab);						  
						}
						tabPanel.setActiveTab(tab);
						
	
	        		}else{      
	            		if(record.data.expanded==true){
	            			record.collapse();                     			
	            		}else{
	            			record.expand();
	            		}                       			
	            	}
		    	}
		    }
		});
		
		
		var panel = Ext.create('Ext.panel.Panel',{
			region: 'center',
	        title:'',
	        layout: 'fit',
	        height:1000,
	        width:1000,
	        items: [{
	            region: 'center',
	            xtype: 'tabpanel',
	            id:'tabPanel',
	    	 	items:[{
	                title: 'Dashboard',
	                html: ' <p>&nbsp; Go to github for <a href="https://github.com/besubasi/com.eft.homework" target="_blank">EFT Software Homework</a> source code</p>',
	                collapsible: true
	            }]		
	        }]
	    });
	
		Ext.create('Ext.container.Viewport', {
			id:'mainViewport',	
		    layout: 'border',
		    items: [tree, panel]
		});

    }
});
	
