from rest_framework import serializers
from .models import Book, Folder, Profile
# ユーザーモデルのインポート（デフォルトで用意されている！username, password, is_superuser, last_login, date_joinedなど）
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        # get_user_model　　現在アクティブなUserモデルを取得(email, is_active, is_staff, createuser, createsuperuser)
        # model = get_user_model()
        model = User
        fields = ('id', 'email', 'password')
        # パスワードはクライアントから読み取れないようにカスタマイズ（フィールド名：{設定}）
        extra_kwargs = {'password': {'write_only': True}}


class ProfileSerializer(serializers.ModelSerializer):
    # created_onはフォーマットをカスタマイズするために別途設定している？？ extra_kwargs内に記述もできる気がする
    # このフォーマットの方がだいぶ見やすい
    created_on = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'nickName', 'userProfile', 'created_on', 'img')
        # userProfileフィールドをviews.pyで設定する場合、ここでは読み取り専用に設定すれば意図しない変更を防げる
        # views.pyで、ログインしているユーザーを識別し→自動でuserProfileに割り当てるらしい
        extra_kwargs = {'userProfile': {'read_only': True}}


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
