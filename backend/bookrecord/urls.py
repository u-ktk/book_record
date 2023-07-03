from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter


app_name = 'bookrecord'

router = DefaultRouter()
router.register('date', views.DateViewSet)
router.register('profile', views.ProfileViewSet)


urlpatterns = [
    # あとでユーザー認証用のアプリと分けたい
    path('myself/', views.ManageUserView.as_view(), name='myself'),

    path('', include(router.urls)),
    path('booklist/', views.BookList.as_view()),
    path('book/<int:pk>/', views.DetailBookList.as_view()),
    path('folder/<int:folder_pk>/', views.FolderBooks.as_view()),
    path('folder/', views.FolderList.as_view(), name='folder'),
    path('book/<str:date>/', views.DateBooks.as_view()),
    path('dates/', views.DateList.as_view(), name='dates'),
    # 他のURLパターンやビューとのマッピング

]
