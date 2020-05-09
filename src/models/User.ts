import axios from 'axios'
import { FirebaseModel } from "./FirebaseModel";

export class User extends FirebaseModel {

  name: string
  mail: string
  birthday: string
  favorite: string
  remarks: string

  constructor() {
    super()
    this.name = ''
    this.mail = ''
    this.birthday = ''
    this.favorite = ''
    this.remarks = ''
  }

  /**
   * Userをすべて取得します。
   */
  public static async getAllUsers() {
    return await axios
      .get('users')
      .then(response => {
        console.log(response.data.documents)

        // レスポンスの内容を代入
        const users = this.setUsers(response.data.documents)

        return users
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  /**
   * Userを1件取得します。
   */
  public static async getUser(documentsPath: string) {

    const documentId = this.getUserDocumentId(documentsPath)

    return await axios
      .get(documentId)
      .then(response => {
        console.log(response.data)

        // レスポンスの内容を代入
        const user = this.setUser(response.data)

        return user
      })
      .catch(error => {
        console.log(error)
        return null
      })
  }

  /**
   * Userを追加します
   */
  public regist() {

    const registUser = super.toRegistModel(this)

    axios.post('users', registUser)
      .then(response => {
        console.log(response)
        document.location.href = 'index.html'
      })
      .catch(error => {
        console.log(error)
        alert('データの追加に失敗しました。')
      })
  }

  /**
   * Userを更新します
   */
  public update() {

    const updateUser = super.toUpdateModel(this)

    axios.post(':commit', updateUser)
      .then(response => {
        console.log(response)
        document.location.href = 'index.html'
      })
      .catch(error => {
        console.log(error)
        alert('データの更新に失敗しました。')
      })
  }

  /**
   * Userを削除します。
   */
  public delete() {
    const documentId = User.getUserDocumentId(this.documentsPath)

    // 削除処理
    axios.delete(documentId)
      .then(response => {
        console.log(response)

        // ページリロード
        location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }

  //#region Private Methods

  /**
   * documentsからUser[]型に入れ直します
   * @param  {any} firebaseResponse
   * @returns User
   */
  private static setUsers(firebaseResponse: any): User[] {

    let users: User[] = []

    for (const item of firebaseResponse) {

      const user = this.setUser(item)
      users.push(user)

    }

    return users
  }

  /**
   * fieldsからUser型に入れ直します
   * @param  {any} userResponse
   * @returns User
   */
  private static setUser(userResponse: any): User {
    var user = new User()

    user.documentsPath = userResponse.name
    user.name = userResponse.fields.name.stringValue
    user.mail = userResponse.fields.mail.stringValue
    user.birthday = userResponse.fields.birthday.stringValue
    user.favorite = userResponse.fields.favorite.stringValue
    user.remarks = userResponse.fields.remarks.stringValue

    return user
  }

  /**
   * DocumentPathから users/id の形式で取得する
   * @param  {string} documentsPath
   * @returns string
   */
  private static getUserDocumentId(documentsPath: string): string {
    const regex = documentsPath.match(/(users\/).+/)
    const documentId = regex === null ? '' : regex[0]

    return documentId
  }

  //#endregion


}


