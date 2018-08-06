<template>
  <div class="about">
  <yd-grids-group :rows="3">
    <yd-grids-item link="/aboutLuru">
        <img slot="icon" src="../assets/lr.png">
        <span slot="text">我的录入</span>
    </yd-grids-item>
    <yd-grids-item >
        <yd-icon slot="icon" name="star" color="#000"></yd-icon>
        <span slot="text">我的收藏</span>
    </yd-grids-item>
    <yd-grids-item link="/aboutSenhe">
        <img slot="icon" src="../assets/sh.png">
        <span slot="text">我的审核</span>
    </yd-grids-item>
  </yd-grids-group>
  </div>
</template>
<style>
.yd-grids-icon img{
    height: 95%!important;
}
</style>
