  // 添加操作
  const INSERT = 0b01;
  // 删除操作
  const REMOVE = 0b10;

  // 操作标签
  let flag = 0b00

  // 给 flag 增加一个 添加操作
  flag |= INSERT;
  // 给 flag 增加一个 删除操作
  flag |= REMOVE;

  // 表示该 flag 拥有 增减 与删除 操作
  console.log(flag.toString(2))

  // 给 flag 移除删除操作
  flag = flag & ~REMOVE;

  console.log(flag.toString(2))

  // 判断 flag 是否包含 添加 操作
  console.log((flag & INSERT) === INSERT, '是否包含 INSERT 操作')
  // 判断 flag 是否包含 移除 操作
  console.log((flag & REMOVE) === REMOVE,'是否包含 REMOVE 操作')