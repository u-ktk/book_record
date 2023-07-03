from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


# UserManager継承　＋　IDではなくメールアドレスでログインに変更
class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError('emailを入力してください')

        user = self.model(email=self.normalize_email(email))
        # passwordはハッシュ化してから保存される
        user.set_password(password)
        user.save(using=self._db)
        return user

    # こっちもemailで保存するバージョンに変更
    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        # staffはadmin画面にログインする権限のみ
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    # 今回はemailがユーザーネームがわり　　フルネームとかより楽かも
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):
    nickName = models.CharField(max_length=20)
    userProfile = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='userProfile',
        on_delete=models.CASCADE
    )
    created_on = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True,
                            upload_to='profile_photos/')

    def __str__(self):
        return self.nickName


class Folder(models.Model):
    folder_name = models.CharField('フォルダ名', max_length=50)
    books = models.ManyToManyField('Book', related_name='folders')

    def __str__(self):
        return self.folder_name


class Book(models.Model):
    PROGRESS_CHOICES = (
        ('unread', '未読'),
        ('reading', '読書中'),
        ('finished', '読了'),
    )
    title = models.CharField('タイトル', max_length=255)
    author = models.CharField('著者', max_length=255)
    folder = models.ForeignKey(Folder, verbose_name='フォルダ',
                               on_delete=models.PROTECT, null=True, blank=True, related_name='book_records')

    progress = models.CharField('読書状況',
                                max_length=10, choices=PROGRESS_CHOICES, default='unread')
    date = models.DateField('日付', null=True, blank=True)
    photo = models.ImageField('画像(任意)', upload_to='book_photos/', blank=True)
    highlighted_quote = models.TextField('印象に残った一文')
    memo = models.TextField('メモ', blank=True)

    def __str__(self):
        return self.title

    # def get_photo_url(self):
    #     if self.photo:
    #         return self.photo.url
    #     else:
    #         return static('bookrecord/no_image_tate.png')
