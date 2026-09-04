import PIL.Image
if not hasattr(PIL.Image, 'ANTIALIAS'):
    PIL.Image.ANTIALIAS = PIL.Image.Resampling.LANCZOS
from moviepy.editor import VideoFileClip

def compress_video():
    input_path = "assets/Homepage_Hero_Video_Fina.mp4"
    output_path = "assets/Homepage_Hero_Video_Fina_Optimized.mp4"
    print(f"Compressing {input_path}...")
    
    # Load clip
    clip = VideoFileClip(input_path)
    
    # Resize to 720p if it's larger
    if clip.h > 720:
        clip = clip.resize(height=720)
        
    # Write with lower bitrate to ensure < 50MB
    clip.write_videofile(output_path, bitrate="1500k", preset="fast")
    print("Done!")

if __name__ == "__main__":
    compress_video()
