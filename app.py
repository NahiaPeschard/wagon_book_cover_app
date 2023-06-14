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

# New function to send the request
def send_request(img_str, user_text):
    url = "https://bookcover-astv2a37ja-ew.a.run.app/predict"
    print(base64.b64decode(img_str))
    data = {
        "image_arr": img_str,
        "title": user_text
    }
    response = requests.put(url, json=data, headers={'Content-Type': 'application/json'})
    # print("yes")
    # print(response.json())
    # print(response.status_code)
    return response.json()



# Create two columns
col1, col2 = st.columns(2)

uploaded_file = col1.file_uploader("Choose an image...", type="jpg")

if uploaded_file != None:
    # Convert the file to an image
    image = Image.open(uploaded_file)

    # Display the image
    st.image(image, caption='Uploaded Image.', use_column_width=True)

    # Resize the image to 100x100 pixels
    resized_img = image.resize((10,10))
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

# When the button is pressed, send the request
if st.button('Send to API'):
    print(img_str)
    if img_str and user_text:
        response = send_request(img_str, user_text)
        st.write(response)
    else:
        st.write("Please enter both an image and text before pressing the button.")
