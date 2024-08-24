# import os
# from app import create_app

# app = create_app()

# if __name__ == '__main__':
#     debug_mode = os.environ.get('FLASK_DEBUG', '1') == '1'
#     app.run(debug=debug_mode, host='0.0.0.0', port=5001)




# source venv/bin/activate
# python run.py

import os
from app import create_app

app = create_app()

if __name__ == '__main__':  
    debug_mode = os.environ.get('FLASK_ENV', 'development') == 'development'   
    port = int(os.environ.get('PORT', 5000))   
    app.run(debug=debug_mode, host='0.0.0.0', port=port)
