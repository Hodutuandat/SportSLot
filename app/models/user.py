class User:
    def __init__(self, id, username, user_type='customer'):
        self.id = id
        self.username = username
        self.user_type = user_type  # 'customer', 'owner', 'admin'
        self.is_authenticated = True
        self.is_active = True
        self.is_anonymous = False
    
    def get_id(self):
        return str(self.id)
    
    def is_customer(self):
        return self.user_type == 'customer'
    
    def is_owner(self):
        return self.user_type == 'owner'
    
    def is_admin(self):
        return self.user_type == 'admin' 