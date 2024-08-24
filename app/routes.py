from flask import Blueprint, render_template, request, redirect, url_for, session, jsonify
from app import db
from app.models import User, Post

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.password == password:  
            session['user_id'] = user.id  
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid username or password.'}), 400

    return render_template('login.html')

@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            username = request.form.get('username')
            password = request.form.get('password')
            confirm_password = request.form.get('confirmPassword')

            if not all([name, username, password, confirm_password]):
                return jsonify({'error': 'All fields are required.'}), 400

            if password != confirm_password:
                return jsonify({'error': 'Passwords do not match.'}), 400

            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return jsonify({'error': 'Username already exists.'}), 400

            new_user = User(username=username, name=name, password=password)
            db.session.add(new_user)
            db.session.commit()

            return jsonify({'message': 'User created successfully.'}), 200
        
        except Exception as e:
            print(f'Error occurred: {e}')
            return jsonify({'error': 'An error occurred. Please try again.'}), 500

    return render_template('register.html')

@main.route('/feed', methods=['GET', 'POST'])
def feed():
    if 'user_id' not in session:
        return redirect(url_for('main.login'))

    # Se a requisição for POST, cria um novo post
    if request.method == 'POST':
        content = request.form.get('content')
        user_id = session['user_id']

        if content:
            new_post = Post(content=content, user_id=user_id)
            db.session.add(new_post)
            db.session.commit()

    # Consulta todos os posts ordenados por data de criação (mais recentes primeiro)
    posts = Post.query.order_by(Post.created_at.desc()).all()

    # Obtém o usuário logado
    user = User.query.get(session['user_id'])

    return render_template('feed.html', posts=posts, user=user)


@main.route('/logout')
def logout():
    session.pop('user_id', None)  # Remove o ID do usuário da sessão
    return render_template('logout.html')
