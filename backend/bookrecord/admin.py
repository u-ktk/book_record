from django.contrib import admin
from . import models
from .models import Book, Folder, Profile
from django.utils.translation import gettext as _
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

admin.site.register(Book)
admin.site.register(Folder)
admin.site.register(Profile)


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    # ユーザーリストでemailをリスト表示
    list_display = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        # personal infoには追加のフィールド設定していない
        (_('Personal Info'), {'fields': ()}),
        (
            # is_active, is_staff, is_superuserの判定（？）　　これらの属性によって閲覧できるページ変わる
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        # 最終ログイン日時のフィールドも設けている
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    # addusersクリックした時
    add_fieldsets = (
        (None, {
            # user作成フォームを広めに設定(djangoのデフォルトクラス)
            # 試してみたけどデフォルトと変わらないよう
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


admin.site.register(models.User, UserAdmin)
