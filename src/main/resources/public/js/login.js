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
                    	document.cookie="sessionUserName="+resp.result.sessionUserName+"; sessionUserId="+resp.result.sessionUserId;
                    	document.location='main.htm';
                    },
                    failure:function(){
                    	Ext.Msg.alert('Error', 'User Name/Password wrong');
                    	Ext.getCmp('password').focus(true);
                    } 
                }); 
            } 
        }] 

    });
    
    form.getEl().center();				    
    Ext.getCmp('btnLogin').focus(true);

});
