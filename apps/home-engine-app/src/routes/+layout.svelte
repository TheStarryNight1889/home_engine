<div class="layout">
    <div class="sidenav">
        <div class="sidenav-header">
            <div class="sidenav-header-title">
                <h1>Home Engine</h1>
            </div>
        </div>
        <div class="sidenav-body">
            <div class="sidenav-body-item">
                <a href="/dashboard">Dashboard</a>
            </div>
            <div class="sidenav-body-item">
                <a href="/devices">Devices</a>
            </div>
            <div class="sidenav-body-item">
                <a href="/rooms">Rooms</a>
            </div>
            <div class="sidenav-body-item">
                <a href="/settings">Settings</a>
            </div>
        </div>
    </div>
    <div class="content">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    .content{
        width: 100%;
    }
    .layout {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100vw;
    }
    .sidenav{
        max-width: 10vh;
        min-width: 10vh;
        color: white;
        height: 100vh;
        background-color: teal;
        padding: 1rem;
        .sidenav-body{
            .sidenav-body-item {
                a {
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
</style>