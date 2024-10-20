import pandas as pd

# Create a sample DataFrame with book details
data = {
    'bookname': ['Python Basics', 'Data Science with Python', 'Machine Learning', 
                 'Deep Learning', 'Artificial Intelligence'],
    'subject': ['Programming', 'Data Science', 'Machine Learning', 
                'Deep Learning', 'AI'],
    'price': [29.99, 39.99, 49.99, 59.99, 69.99]
}

# Create DataFrame
books_df = pd.DataFrame(data)

# Display the DataFrame
print("All  Books",books_df)
# Query for books with price greater than 40
expensive_books = books_df.query('price > 40')

# Display the result
print("Expensive Books\n",expensive_books)