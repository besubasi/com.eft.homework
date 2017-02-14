Ext.require(['Ext.form.*']);

Ext.onReady(function(){
    var form = Ext.create('Ext.form.FormPanel', {
    	width: 400,
        labelWidth:80,
        url:'authenticate', 
        frame:true, 
        title:'Login', 
        defaultType:'textfield',
        renderTo:'divLogin',		        	
        monitorValid:true,
        items:[{
        		id : 'email',
                fieldLabel:'Email', 
                name:'email',
                value : 'demo@bumin.com.tr',
                allowBlank:false
            },{ 
            	id:'password',
                fieldLabel:'Password', 
                name:'password', 
                inputType:'Password', 
                value : 'cjaiU8CV',
                allowBlank:false 
            }],
        buttons:[{
        	id : 'btnLogin',
            text:'Login',
            formBind: true,	 
            handler:function(){ 
            	form.getForm().submit({ 
                    method:'POST',
                    waitTitle:'', 
                    waitMsg:'Please wait to login',	
                    success:function(o,resp){
                    	document.cookie="token="+resp.result.token;
                    	document.location='main.html';
                    },
                    failure:function(){
                    	Ext.Msg.alert('Error', 'Email or Password wrong');
                    	Ext.getCmp('password').focus(true);
                    } 
                }); 
            } 
        }] 

    });
    
    form.getEl().center();				    
    Ext.getCmp('btnLogin').focus(true);

});
