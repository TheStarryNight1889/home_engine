<div class="layout">
    <div class="sidenav">
        <div class="sidenav__header">
            <div class="sidenav__header__title">
                <h1>Home Engine</h1>
            </div>
        </div>
        <div class="sidenav__body">
            <div class="sidenav__body__item">
                <a href="/">Dashboard</a>
            </div>
            <div class="sidenav__body__item">
                <a href="/devices">Devices</a>
            </div>
            <div class="sidenav__body__item">
                <a href="/locations">Locations</a>
            </div>
            <div class="sidenav__body__item">
                <a href="/settings">Settings</a>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="title__card">
            <div class="title__card__welcome">Welcome, Christie!</div>
            <div class="title__card__text">DEVICES</div>
        </div>
        <slot></slot>
    </div>
</div>

<script>
</script>

<style lang="scss">
    .content{
        width: 100%;
        background-color: #ffffff;
    }
    .layout {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100vw;
    }
    .title__card{
        display: flex;
        flex-direction: row;

        margin: 25px;
        height: 80px;        
        background-color: #07A0C3;
        max-width: 100%;
        text-align: center;
        border: 5px solid black;
        border-top: 25px solid black;
        // vertically center the elements
        align-items: center;
        text-align: left;
        &__welcome{
            width: 70%;
            margin-left: 1rem;
        }
        &__text{
            margin-left: 1rem;
            width:30%;
            font-size: 2rem;
            font-weight: 600;
        }
    }
    .sidenav{
        border-top: 25px solid black;
        border-right: 5px solid #000000;
        border-bottom: 5px solid #000000;
        max-width: 30vh;
        min-width: 10vh;
        color: #000000;
        height: 100%;
        background-color: #45CB85;
        &__header{
            padding-left: 1rem;
            text-align: left;
            border-bottom: 5px solid #000000;
        }
        &__body{
            margin-top: 2rem;
            margin-left: 1rem;
            margin-right: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            &__item {
                font-size: 1.5rem;
                border: 5px solid #000000;
                background-color: #F0C808;
                padding: 0.5rem;
                text-align: center;
                a {
                    text-decoration: none;
                    color: #000000;
                    font-weight: 400;
                }
            }
        }
    }
</style>