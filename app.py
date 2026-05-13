import streamlit as st

st.title("AI Codebase Assistant")

repo = st.text_input("Enter GitHub Repository URL")

question = st.text_input("Ask Question About Repository")

if st.button("Analyze"):
    st.write("Processing Repository...")