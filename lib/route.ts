import UserEntity from "@/interfaces/UserEntity";

export const getPowers = ([begin, end]: PowerEnum, n: number) => {
    let num = 0;
    for (let i = begin; i <= end; i++) {
        let bool = (n >> i) % 2 === 1;
        if (bool) num += Math.pow(2, i - begin);
    }
    return num;
}
export const setPowers = ([begin, end]: PowerEnum, n: number, value: number) => {
    const length = end - begin + 1;
    const max = ~(~(~0 << length) << begin)
    value = (~(~0 << length) & value) << begin;
    return (n & max) | value
}
//采用位判断权限。0-31有效
/**
 * [begin,end].开区间
 */
export type PowerEnum = [number, number];
/**
 * 3 账号权限
 * 1  可登录                     
 * 11 可编辑他人信息
 */
export const AccountPower: PowerEnum = [0, 1];
/**
 * 7 权限大小
 * 权限优先级，111（7）为最高权限，且可以设置他人账号权限。
 * 高优先级可编辑低优先级的账号，同优先级之间不可编辑。
 */
export const PowerSize: PowerEnum = [2, 4];

/**
 * 文章权限
 * 01 可发布文章
 * 11 可编辑所有人文章
 */
export const PostsPower: PowerEnum = [5, 6]

/**
 * 课程权限
 * 1 可发布编辑课程
 */
export const CoursePower: PowerEnum = [7, 8]

/**
 * 讨论权限
 * 01 可发布评论
 * 10 可发布话题
 * 11 可审批、编辑评论、话题
 */
export const DiscussPower: PowerEnum = [9, 10]

/**
 * 订单权限
 * 0 无
 * 1 可查看所有订单
 * 10 可进行退款等
 * 11 可进行编辑等
 */
export const OrderPower: PowerEnum = [11, 12];

export const PowerList = [
    {
        name: "账号权限(3)",
        power: AccountPower
    }, {
        name: "权限大小(7)",
        power: PowerSize
    }, {
        name: "文章权限(3)",
        power: PostsPower
    }, {
        name: "课程权限(1)",
        power: CoursePower
    }, {
        name: "讨论权限(3)",
        power: DiscussPower
    }, {
        name: "订单权限(3)",
        power: OrderPower
    }
]
const hasRule = (power: PowerEnum, callback: (p: number) => boolean) => {
    return (user: UserEntity) => callback(getPowers(power, user.role))
}

export const routes = [
    {
        name: "个人信息",
        path: "/"
    },
    {
        name: "账号设置",
        path: "/setting"
    },
    {
        name: "我的文章",
        role: hasRule(PostsPower, (e) => !!e),
        path: "/posts"
    },
    {
        name: "文章管理",
        role: hasRule(PostsPower, (e) => e === 3),
        path: "/admin/posts"
    },
    {
        name: "课程管理",
        role: hasRule(CoursePower, e => !!e),
        path: "/admin/course"
    },
    {
        name: "账号管理",
        role: hasRule(AccountPower, e => e == 3),
        path: "/admin/account"
    },
    {
        name: "我的订单",
        path: "/order"
    },
    {
        name: "订单管理",
        role: hasRule(OrderPower, e => !!e),
        path: "/admin/order"
    },
    {
        name: "系统管理",
        role: hasRule(AccountPower, e => e === 3),
        path: "/admin/system"
    },
    {
        name: "文章备份",
        role: hasRule(AccountPower, e => e === 3),
        path:"/admin/backup"
    },
    {
        name: "日志管理",
        role: hasRule(PowerSize, e => e >= 6),
        path: "/admin/logs"
    }
]