import cv2
import numpy as np

def sobel_edge_detection(image_path):
    # Load the image in grayscale
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    if image is None:
        print("Error: Could not open or find the image.")
        return
    
    # Apply Sobel filter in X and Y direction
    sobel_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=3)
    
    # Compute the gradient magnitude
    sobel_magnitude = np.sqrt(sobel_x**2 + sobel_y**2)
    sobel_magnitude = np.uint8(255 * sobel_magnitude / np.max(sobel_magnitude))
    
    # Display results
    cv2.imshow('Original Image', image)
    
    cv2.imshow('Sobel Magnitude', sobel_magnitude)
    
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Example usage
image_path = 'abc.png'  # Change this to your image file path
sobel_edge_detection(image_path)
