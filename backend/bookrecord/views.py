# APIレスポンス
from rest_framework import generics
from rest_framework import viewsets

from .models import Book, Folder, Profile
# シリアライザーのインポート
from .serializers import BookSerializer, BookDetailSerializer, FolderBooksSerializer, FolderListSerializer, DateSerializer, DateListSerializer,  UserSerializer
from . import serializers

# ログインしたユーザーを更新


class ManageUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    # 認証が通った人のみアクセスできる
    # authentication_classes = (TokenAuthentication)
    # permission_classes = (IsAuthenticated)

    def get_object(self):
        return self.request.user


# 本の登録
# class


class DateViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = DateSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(userProfile=self.request.user)

# 本の一覧(Home.js)


class BookList(generics.ListAPIView):
    queryset = Book.objects.order_by('-date')
    serializer_class = BookSerializer


# 本の詳細(BookDetail.js)
class DetailBookList(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailSerializer


# フォルダーごとの本の一覧を返す(FolderDetail.js)
class FolderBooks(generics.ListAPIView):
    serializer_class = FolderBooksSerializer
    queryset = Folder.objects.all()

    def get_queryset(self):
        folder_pk = self.kwargs['folder_pk']
        queryset = self.queryset.filter(pk=folder_pk)
        return queryset


# フォルダーの一覧を返す(FolderView.js)
class FolderList(generics.ListAPIView):
    serializer_class = FolderListSerializer
    queryset = Folder.objects.all()


# その日読んだ本の一覧を返す(CalendarDetail.js)
class DateBooks(generics.ListAPIView):
    serializer_class = DateSerializer
    queryset = Book.objects.all().distinct()

    def get_queryset(self):
        date = self.kwargs['date']
        queryset = self.queryset.filter(date=date)
        return queryset


# 本が登録されている日付の一覧を返す(BookCalendar.js)
class DateList(generics.ListAPIView):
    serializer_class = DateListSerializer
    queryset = Book.objects.values('date').distinct()

# class DateList(generics.ListAPIView):
#     serializer_class = DateListSerializer
#     queryset = Book.objects.all()

#     def get_queryset(self):
#         date_list = self.queryset.values_list('date', flat=True).distinct()
#         return date_list
