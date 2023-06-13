import streamlit as st
from PIL import Image
import requests
from io import BytesIO


# Add a title
st.title("Wagon Book Cover")

uploaded_file = st.file_uploader("Choose an image...", type="jpg")

if uploaded_file is not None:
    # Convert the file to an image
    image = Image.open(uploaded_file)

    # Display the image
    st.image(image, caption='Uploaded Image.', use_column_width=True)

    st.write("")
    st.write("Classifying...")
    # Here you can add your image classification function

url = st.text_input("Please enter image url", '')

if url != '':
    try:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content))

        # Display the image
        st.image(image, caption='Image from url.', use_column_width=True)

        st.write("")
        st.write("Processing...")
        # Here you can add your image processing function

    except Exception as e:
        st.write("There was an error processing this url. Please enter a correct url and try again.")
