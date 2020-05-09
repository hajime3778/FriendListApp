import axios from 'axios'
import { HttpUtil } from '../common/Utils/HttpUtil';
import { User } from '../models/User';

export class EditView {

  //#region Properties
  private registTitle: string = "おともだちを追加"
  private editTitle: string = "おともだちの情報を編集"
  documentsPath: string = ''
  //#endregion

  //#region Components
  title: HTMLElement | null;
  name: HTMLInputElement | null;
  mail: HTMLInputElement | null;
  birthday: HTMLInputElement | null;
  favorite: HTMLInputElement | null;
  remarks: HTMLInputElement | null;

  registButton: HTMLElement | null;
  updateButton: HTMLElement | null;
  //#endregion

  constructor() {

    // HTMLElement取得
    this.title = document.getElementById('title')
    this.name = <HTMLInputElement>document.getElementById('user-name')
    this.mail = <HTMLInputElement>document.getElementById('user-mail')
    this.birthday = <HTMLInputElement>document.getElementById('birthday')
    this.favorite = <HTMLInputElement>document.getElementById('favorite')
    this.remarks = <HTMLInputElement>document.getElementById('remarks')
    this.registButton = document.getElementById('regist-button')
    this.updateButton = document.getElementById('update-button')

    // イベントの登録
    this.registButton?.addEventListener("click", () => {
      this.registButtonClick()
    });
    this.updateButton?.addEventListener("click", () => {
      this.updateButtonClick()
    });

    // URLクエリを取得
    const query = HttpUtil.getUrlQueries()

    if (query['documentPath'] == null) {
      // 追加のとき(IDが存在しない場合)の処理

      // 追加画面のタイトルを設定
      this.setTitle(this.registTitle)

      // 更新ボタンを削除する
      this.updateButton?.parentNode?.removeChild(this.updateButton)

    } else {
      // 更新のとき(IDが存在する場合)の処理

      // 更新画面のタイトルを設定
      this.setTitle(this.editTitle)
      // documentPathを取得
      this.documentsPath = query['documentPath']
      // 追加ボタンを削除する
      this.registButton?.parentNode?.removeChild(this.registButton)

    }
  }

  //#region Events

  /**
   * ロード時の処理
   */
  public async loadView() {
    if (this.documentsPath !== '') {
      const user = await User.getUser(this.documentsPath)

      if (user !== null) {
        this.setDisplay(user)
      }

    }
  }

  /**
   * 追加ボタン押下時
   */
  public registButtonClick() {

    const user = new User()

    user.name = this.name?.value ?? ''
    user.mail = this.mail?.value ?? ''
    user.birthday = this.birthday?.value ?? ''
    user.favorite = this.favorite?.value ?? ''
    user.remarks = this.remarks?.value ?? ''

    // Userの追加
    user.regist()
  }

  /**
   * 更新ボタン押下時
   */
  public async updateButtonClick() {
    const user = new User()

    user.documentsPath = this.documentsPath
    user.name = this.name?.value ?? ''
    user.mail = this.mail?.value ?? ''
    user.birthday = this.birthday?.value ?? ''
    user.favorite = this.favorite?.value ?? ''
    user.remarks = this.remarks?.value ?? ''

    // Userの更新
    user.update()
  }

  //#endregion

  //#region Private Methods

  /**
   * ページのタイトルを設定します
   * @param  {string} title
   */
  private setTitle(title: string) {

    if (document.title === '' || document.title === this.registTitle || document.title === this.editTitle) {
      document.title = title
      this.title?.insertAdjacentText('afterbegin', title)
    }

  }

  /**
   * 画面項目に値をセットします。
   * @param  {User} user
   */
  private setDisplay(user: User) {
    this.documentsPath = user.documentsPath

    if (this.name !== null) {
      this.name.value = user.name
    }

    if (this.mail !== null) {
      this.mail.value = user.mail
    }

    if (this.birthday !== null) {
      this.birthday.value = user.birthday
    }

    if (this.favorite !== null) {
      this.favorite.value = user.favorite
    }

    if (this.remarks !== null) {
      this.remarks.value = user.remarks
    }
  }

  //#endregion

}