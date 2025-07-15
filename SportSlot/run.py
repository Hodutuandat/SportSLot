from app import create_app, render_template

app = create_app()
@app.route('/test-base')
def test_base():
    return render_template('test_base.html')


if __name__ == "__main__":
    # Có thể đổi debug=True thành False khi deploy production
    app.run(debug=True)
