from django.urls import path
from . import views

urlpatterns = [
    path('data-collect/<str:source>/', views.collect_data, name='collect_data'),
    path('data-collect/csv-upload/', views.upload_csv, name='upload_csv'),
    path('visualization/', views.get_visualization, name='get_visualization'),
]
