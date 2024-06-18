from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import FileResponse, Http404
import os

@api_view(['POST'])
def collect_data(request, source):
    # Handle data collection from various sources
    if source == 's3':
        aws_access_key = request.data.get('awsAccessKey')
        aws_secret_key = request.data.get('awsSecretKey')
        bucket_name = request.data.get('bucketName')
        object_key = request.data.get('objectKey')
        # Add your S3 data collection logic here
    elif source == 'azure':
        azure_account = request.data.get('azureAccount')
        azure_key = request.data.get('azureKey')
        container_name = request.data.get('containerName')
        blob_name = request.data.get('blobName')
        # Add your Azure data collection logic here
    elif source == 'gdrive':
        gdrive_api_key = request.data.get('gdriveApiKey')
        file_id = request.data.get('fileId')
        # Add your Google Drive data collection logic here
    elif source == 'csv-path':
        csv_file_path = request.data.get('csvFilePath')
        # Add your CSV file path processing logic here
    else:
        return Response({'error': 'Unsupported data source'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'message': 'Data collected successfully'})

# @api_view(['POST'])
# def upload_csv(request):
#     parser_classes = (FileUploadParser,)
    
#     if 'file' not in request.data:
#         return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
    
#     file = request.data['file']
#     file_path = default_storage.save(file.name, file)
    
#     return Response({'message': 'File uploaded successfully', 'file_path': file_path})

@api_view(['POST'])
@parser_classes([FileUploadParser])
def upload_csv(request):
    if 'file' not in request.data:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.data['file']
    file_path = os.path.join(settings.MEDIA_ROOT, file.name)

    with open(file_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    return Response({'message': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)

# @api_view(['GET'])
# def get_visualization(request):
#     # Return the visualization image
#     try:
#         # image_path = 'path/to/your/visualization.png'
#         image_path = '/SKMSign.png'
#         with open(image_path, 'rb') as image_file:
#             return Response(image_file.read(), content_type="image/png")
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_visualization(request):
    try:
        image_path = '/Users/sandeepmalhotra/Downloads/SKMSign.png'  # Ensure this path is correct
        if os.path.exists(image_path):
            return FileResponse(open(image_path, 'rb'), content_type='image/png')
        else:
            raise Http404("File not found")
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)