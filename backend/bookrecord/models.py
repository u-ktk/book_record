from django.db import models


class Folder(models.Model):
    folder_name = models.CharField('フォルダ名', max_length=50)
    books = models.ManyToManyField('Book', related_name='folders')

    def __str__(self):
        return self.name


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
