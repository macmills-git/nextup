Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\Admin\Desktop\fyp\upNext\src\Gemini_Generated_Image_60wrp760wrp760wr.jpg"
$destJpg = "c:\Users\Admin\Desktop\fyp\upNext\public\favicon.jpg"
$destPng = "c:\Users\Admin\Desktop\fyp\upNext\public\favicon.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$size = [Math]::Min($img.Width, $img.Height)
$x = [int](($img.Width - $size) / 2)
$y = [int](($img.Height - $size) / 2)

$rect = New-Object System.Drawing.Rectangle($x, $y, $size, $size)
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$destRect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
$g.DrawImage($img, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($destJpg, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Successfully cropped 1:1 square favicon!"
