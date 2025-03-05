import cv2 as pp

pic = pp.imread("champak.jpg")

print()

if pic is None:

    print("Picture not found")

else:

    print(type(pic))

    mx, my, mz = pic.shape

    for x in range(mx):

        for y in range(my):

            b = int(pic[x][y][0])  # Blue Value

            g = int(pic[x][y][1])  # Green Value

            r = int(pic[x][y][2])  # Red Value

            bwvalue = int((r+g+b)//3)  # Average RGB

            pic[x][y][0] = bwvalue

            pic[x][y][1] = bwvalue

            pic[x][y][2] = bwvalue

            print(r, g, b)

    output = pp.imshow("Show Picture", pic)

    print(output)

    pp.imwrite("saved.png", pic)  # Save to disk

    output = pp.waitKey(0)
