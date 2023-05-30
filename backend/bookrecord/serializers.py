from rest_framework import serializers
from .models import Book, Folder
# ユーザーモデルのインポート（デフォルトで用意されている！username, password, is_superuser, last_login, date_joinedなど）
from django.contrib.auth.models import User

# token（認証情報）のインポート
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

        # 新しいユーザーを作製
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            # ユーザーとトークンの関連付け（＝＞認証がスムーズになるイメージ）
            Token.objects.create(user=user)
            return user


class BookSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    title = serializers.CharField()
    photo = serializers.ImageField()
    progress = serializers.CharField()

    def get_id(self, obj):
        return obj.pk


class BookDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'folder',
                  'progress', 'date', 'photo', 'highlighted_quote', 'memo']


class FolderBooksSerializer(serializers.ModelSerializer):
    books = serializers.SerializerMethodField()

    def get_books(self, folder):
        return [(book.title, book.id) for book in folder.books.all()]

    class Meta:
        model = Folder
        fields = '__all__'


# フォルダーのリストを返す

class FolderListSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, folder):
        return folder.id

    class Meta:
        model = Folder
        fields = ['id', 'folder_name']


class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'date']


# 本が登録されている日付のリストを返す（もっといい方法探したい）
class DateListSerializer(serializers.Serializer):
    date = serializers.DateField()
