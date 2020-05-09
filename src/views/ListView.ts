import axios from 'axios'
import { User } from "../models/User";

export class ListView {

  //#region Components
  userList: HTMLElement | null;
  //#endregion

  constructor() {
    // HTMLElement取得
    this.userList = document.getElementById('user-list')

  }

  //#region Events

  // ロード時
  public async loadView() {
    // データベース（Firebase）取得処理
    // 結果が取得できるまで待つ
    const users = await User.getAllUsers()

    if (users === null) {
      this.userList?.insertAdjacentHTML('afterbegin', '<p style="color: red">おともだちリストが取得できませんでした。</p>')
      return
    }

    // usersの中身の数だけ繰り返す
    for (const user of users) {

      this.userList?.insertAdjacentHTML('afterbegin',
        `<div id="${user.documentsPath}" class="friend-row">
          <ul class="friend">
            <li class="name_space">${user.name}</li>
            <li class="mail_space">${user.mail}</li>
            <li class="birthday_space">${user.birthday}</li>
            <li class="favorite_space">${user.favorite}</li>
            <li class="remarks_space">${user.remarks}</li>
          </ul>
          <img id="delete-btn" class="dust" src="images/dust-box.png">
        </div>`
      )
    }

    // 編集イベントの登録
    var friends = document.getElementsByClassName('friend')

    for (let index = 0; index < friends.length; index++) {
      const friendRow = friends[index]

      friendRow.addEventListener("click", () => {
        if (friendRow.parentElement !== null) {
          this.friendRowClick(friendRow.parentElement.id)
        }
      });
    }

    // 削除イベントの登録
    var deleteButtons = document.getElementsByClassName('dust')
    for (let index = 0; index < deleteButtons.length; index++) {
      const deleteButton = deleteButtons[index]

      deleteButton.addEventListener("click", () => {
        if (deleteButton.parentElement !== null) {
          this.deleteClick(deleteButton.parentElement.id)
        }
      });
    }

  }

  /**
   * おともだちの行がクリックされたとき
   * @param  {string} documentPath
   */
  private friendRowClick(documentPath: string) {
    document.location.href = `edit.html?documentPath=${documentPath}`
  }

  /**
   * 削除ボタンがクリックされたとき
   * @param  {string} documentPath
   */
  private async deleteClick(documentPath: string) {

    var user = await User.getUser(documentPath)

    if (user === null) {
      return
    }

    var result = window.confirm(`${user.name} さん のデータを削除します。\nよろしいですか？`)

    if (result) {
      // データを削除
      user.delete()
    }

  }

  //#endregion

}