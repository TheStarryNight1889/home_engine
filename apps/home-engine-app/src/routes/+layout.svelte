<div class="layout">
    <div class="sidenav">
        <div class="sidenav-header">
            <div class="sidenav-header-title">
                <h1>Home Engine</h1>
            </div>
        </div>
        <div class="sidenav-body">
            <div class="sidenav-body-item">
                <a href="/">Dashboard</a>
            </div>
            <div class="sidenav-body-item">
                <a href="/devices">Devices</a>
            </div>
            <div class="sidenav-body-item">
                <a href="/locations">Locations</a>
            </div>
            <div class="sidenav-body-item">
                <a href="/settings">Settings</a>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="title-card">
            <div class="title-welcome">Welcome, Christie!</div>
            <div class="title-text">DEVICES</div>
        </div>
        <slot></slot>
    </div>
</div>

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
    .title-card{
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
        .title-welcome{
            width: 70%;
            margin-left: 1rem;
        }
        .title-text{
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
        .sidenav-header{
            margin-left: 1rem;
        }
        .sidenav-body{
            margin-left: 1rem;
            .sidenav-body-item {
                a {
                    text-decoration: none;
                    color: #000000;
                    font-weight: 600;
                }
            }
        }
    }
</style>