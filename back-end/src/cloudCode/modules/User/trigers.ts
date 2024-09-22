Parse.Cloud.beforeSave(
    Parse.User,
    async req =>{
        const object = req.object;
        const acl = new Parse.ACL();
        acl.setPublicReadAccess(true)
        object.setACL(acl)
        
    }
)