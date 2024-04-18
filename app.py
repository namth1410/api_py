from flask import Flask, request, jsonify
import webbrowser
import time
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def open_or_switch_to_youtube():
    # Kiểm tra xem có tab nào đang mở YouTube hay không
    existing_tab_found = False
    for _ in range(5):  # Giả sử tìm kiếm trong 5 tab đầu tiên
        subprocess.run(["xdotool", "key", "ctrl+Tab"])  # Chuyển sang tab tiếp theo
        time.sleep(0.5)  # Chờ một chút cho tab chuyển đổi

        # Kiểm tra xem tab hiện tại có URL của YouTube hay không
        current_url = subprocess.run(["xdotool", "getactivewindow", "getwindowname"], capture_output=True, text=True).stdout
        print(current_url)
        if "YouTube" in current_url:
            existing_tab_found = True
            break

    # Nếu không có tab nào đang mở YouTube, mở tab mới
    if not existing_tab_found:
        webbrowser.open_new_tab("https://www.youtube.com")

    # Nếu đã có tab YouTube, thay đổi URL của tab đó
    else:
        subprocess.run(["xdotool", "key", "ctrl+l"])  # Chọn thanh địa chỉ
        subprocess.run(["xdotool", "key", "ctrl+a"])  # Chọn toàn bộ URL hiện tại
        subprocess.run(["xdotool", "type", "https://www.youtube.com/watch?v=2VbVpXAbC6g"])  # Thay đổi URL, thay VIDEO_ID bằng ID của video muốn mở
        subprocess.run(["xdotool", "key", "Return"])  # Nhấn Enter để tải lại trang

@app.route('/control_pc', methods=['POST'])
def control_pc():
    # Kiểm tra xem yêu cầu có chứa dữ liệu JSON không
    if request.is_json:
        data = request.json
        print("Received request:", data)

        # Thực hiện hành động mở hoặc chuyển đến YouTube
        open_or_switch_to_youtube()

        # Trả về phản hồi cho yêu cầu
        return jsonify({"message": "OK"})
    else:
        # Trả về lỗi nếu yêu cầu không chứa dữ liệu JSON hợp lệ
        return jsonify({"error": "Invalid JSON format"}), 400

if __name__ == '__main__':
    app.run(debug=True)
