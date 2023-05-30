from django.urls import path
from . import views
from bookrecord.views import UserViewSet
from django.conf.urls import include
from rest_framework import routers

app_name = 'bookrecord'

router = routers.DefaultRouter()
router.register('users', UserViewSet)


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
