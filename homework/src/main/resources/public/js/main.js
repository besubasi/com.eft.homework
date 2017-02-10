Ext.onReady(function(){	

	function objProp(o) {
	    var t = "";
	    for (var q in o) t += o[q] instanceof Function ? q + " = function{}\n" : q + " = " + o[q] + "\n";
	    return t;
	}

	
	var treeStore = Ext.create('Ext.data.TreeStore', {
	    root: {
	        expanded: true,
	        children: [
	            { text: 'Menü List', expanded: true, children: [
	                { text: 'Transaction List', leaf: true, page : 'transactionList'},
	                { text: 'Transaction Detail', leaf: true, page : 'transactionDetail'},
	                { text: 'Merchant', leaf: true, page : 'merchant'},
	                { text: 'Client', leaf: true, page : 'client'}
	            ] },
	            { text: 'Reports', expanded: false, children: [
	                { text: 'Report', leaf: true, page : 'report'}
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
            	if(record.data.leaf==true){
            		var tabPanel = Ext.getCmp('tabPanel');
                    var addIndex = tabPanel.items.length ;
                    if(record.data.page == 'merchant'){
                    	var merchantGrid = Ext.getCmp('tabMerchant');
                        tabPanel.insert(addIndex,merchantGrid);
                    }else{
                        tabPanel.insert(addIndex,{
                            title:record.data.text,
                            closable:true
                        });
                    }
                    tabPanel.setActiveTab(addIndex);                    
            		
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
                html: ' This is a Homework',
                collapsible: true
            }]   
        }]
    });

	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [tree, panel,{
	        region: 'south',
	        title: 'South Panel',
	        collapsible: true,
	        html: 'Information goes here',
	        split: true,
	        height: 100,
	        minHeight: 100
	    }]
	});

});
