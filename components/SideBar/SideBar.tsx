import style from "@/components/SideBar/SideBar.module.scss";

export default function SideBar() {
    return (
        <div className={style.container}>
            <ul className={style.list}>
                <li className={style.theme}>Начало работы</li>
                <li className={style.theme}>Группировка кластеров</li>
                <li className={style.theme}></li>
                <li className={style.theme}></li>
            </ul>
        </div>
    )
}