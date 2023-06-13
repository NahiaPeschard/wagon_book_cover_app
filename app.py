import streamlit as st
from PIL import Image
import requests
from io import BytesIO
import numpy as np
import io
import base64
import json
import sys

# Add a title
st.title("Wagon Book Cover")

# Convert np array to bytes
def np_to_bytes(np_array):
    byte_io = io.BytesIO()
    np.save(byte_io, np_array)
    byte_io.seek(0)
    return byte_io.read()

# Convert bytes to base64 string
def bytes_to_base64(bytes_data):
    return base64.b64encode(bytes_data).decode('utf-8')

def img_to_base64(img):
    buffered = io.BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    return img_str

def send_image_to_backend(img_str):
    # # Replace with the actual URL of your backend API
    # url = "http://backend-api-url/path"
    # data = {
    #     "image": img_str,
    #       "title": "ABA"
    # }
    # response = requests.post(url, data=json.dumps(data))
    return response.json() # assuming the backend returns a JSON response

# Create two columns
col1, col2 = st.columns(2)

uploaded_file = col1.file_uploader("Choose an image...", type="jpg")

if uploaded_file != None:
    # Convert the file to an image
    image = Image.open(uploaded_file)

    # Display the image
    st.image(image, caption='Uploaded Image.', use_column_width=True)

    # Resize the image to 100x100 pixels
    resized_img = image.resize((100,100))
    # # Convert image to base64 and send to backend
    # img_str = img_to_base64(resized_img)
    image_array = np.array(resized_img)
    print(image_array)
    # Convert numpy array to bytes
    bytes_data = np_to_bytes(image_array)

    # Convert bytes to base64 string
    img_str = bytes_to_base64(bytes_data)
    # response = send_image_to_backend(img_str)
    # st.write(response) # Display the response from the backend
    # Specify your filename
    # filename = "output.txt"

    # # Open the file in write mode ('w')
    # with open(filename, 'w') as file:
    #     file.write(img_str)

url = col2.text_input("Please enter image url", '')

if url != '':
    try:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content))

        # Display the image
        st.image(image, caption='Image from url.', use_column_width=True)

        # Resize the image to 100x100 pixels
        resized_img = image.resize((100,100))
        # # Convert image to base64 and send to backend
        # img_str = img_to_base64(resized_img)
        image_array = np.array(resized_img)
        print(image_array)
        # Convert numpy array to bytes
        bytes_data = np_to_bytes(image_array)

        # Convert bytes to base64 string
        img_str = bytes_to_base64(bytes_data)
        # response = send_image_to_backend(img_str)
        # st.write(response) # Display the response from the backend
        # Specify your filename
        # filename = "output.txt"

        # # Open the file in write mode ('w')
        # with open(filename, 'w') as file:
        #     file.write(img_str)
    except Exception as e:
        st.write("There was an error processing this url. Please enter a correct url and try again.")

# Use text_input to get text from user
user_text = st.text_input("Please enter some text", '')

# Use the text entered by the user
if user_text:
    print(user_text)
