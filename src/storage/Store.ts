export class Store {
    #config;

    /**
     * Store constructor
     */
    constructor(options) {
        this.#config = options;
    };

    // 存储或获取

    /**
     * @description 存储或获取数据
     * @method storage
     * @param { string } key 存储的键名，或用于获取值的键名
     * @param { any } [value] 存储的值，如果没有传入，则视为获取值
     * @returns { void | any } 
     * - 如果没有传入有效的 `value`，则返回对应键名的值；
     * - 否则，存储对应键名的值并返回 `undefined`。
     */
    storage(
        key: string,
        value?: any
    ): void | any {
        return m_store(this.#config, key, value)
    };

    /**
     * 用于重写本地存储中的数据。
     * - 该方法从本地存储中获取数据并传递给回调函数，回调函数返回新的数据对象，然后将新的数据对象写回本地存储。
     * - 须要确保回调函数返回的对象与原始数据对象具有相同的键。
     *
     * @method rewrite
     * @param { string | Array<string> } keys 数据
     * @param { (items: { [storageKey: string]: any }) => { [storageKey: string]: any } } callback 回调函数
     * @returns { void } 
     */
    rewrite(
        keys: string | Array<string>,
        callback: (items: {
            [storageKey: string]: any
        }) => ({
            [storageKey: string]: any
        })
    ): void {
        m_rewrite(this.#config, keys, callback, this)
    };


    /* ========== */


    // 存储

    /**
     * 设置单条存储数据
     *
     * @method save
     * @param { string } key 数据的键名
     * @param { any } value 要存储的值
     * @returns { void } 仅设置键的值，无返回值
     */
    save(
        key: string,
        value: any
    ): void {
        m_store(this.#config, key, ValidateValue(this.#config, value))
    };

    /**
     * 通过数组中的对象中的 key 和 value 属性批量设置多条存储数据
     * 
     * @method SaveMany
     * @param { Array<{key: string, value: any}> } arr 要存储的多条数据，数组中的每个元素都是包含 key 和 value 属性的对象
     * @returns { void } 仅设置键的值，无返回值
     */
    saveMany(arr: Array<{ key: string, value: any }>): void {
        m_setManyFromKeyValue(this.#config, arr)
    };

    /**
     * 通过对象批量设置多条存储数据
     * 
     * @method setMany
     * @param { { [key: string]: any } } obj 要存储的多条数据，对象中的每个属性的将作为key，属性值将作为存储的值。
     * @returns { void } 仅设置键的值，无返回值
     */
    setMany(obj: { [key: string]: any }): void {
        m_setManyFromObject(this.#config, obj)
    };

    /**
     * 设置单条或多条存储数据。
     * - 该方法本质上是对 save、saveMany、setMany 的整合，用于简化调用。
     * - 该函数传入参数数量为必须为 1 ~ 2。
     * - 参数的传入原则与 save、saveMany、setMany 三个方法相同。
     *
     * @method set
     * @param { Array<{ key: string, value: any }> | { [key: string]: any } | string } data 要存储的单条或多条数据
     * @returns { void } 仅设置值，无返回值
     */
    set(...data:
        [Array<{ key: string, value: any }>]
        | [{ [key: string]: any }]
        | [string, any]
    ): void {
        m_setValueMethod(this.#config, data)
    };


    /* ========== */


    // 获取

    /**
     * 获取单条存储数据
     * 
     * @method get
     * @param { string } key 数据的键名
     * @returns { any } 返回键的存储值
     */
    get(key: string): any {
        return m_store(this.#config, key)
    };

    /**
     * 从存储中获取多个键对应的值。
     * - 如关于 type 的具体用法无法理解，请参见说明文档。
     * @link 官方文档 <https://www.yuque.com/realmaybe0429/storage-provider>
     * 
     * @method getMany
     * @param { Array<string> } arr 包含需要获取值的键的数组。
     * @param { "array" | "object" | "array-object" } [type = "object"] 获取值之后的输出类型，可选值为 "array", "object", "array-object"。
     * @returns { Array<{ [key: string]: any }> | { [key: string]: any } | Array<{ key: string, value: any }> } 返回包含键值对的数组或对象，具体形式由 type 参数决定。
     */
    getMany<K extends string>(
        arr: Array<K>,
        type: OutputType = "object"
    ): OutputResult<K, typeof type> {
        return m_getMany(this.#config, arr, type as "object");
    };

    /**
     * 从本地存储中获取所有数据。
     * 
     * @method getAll
     * @returns { { [storageKey: string]: any } } 包含所有本地存储数据的对象。
     */
    getAll(): { [storageKey: string]: any } {
        return m_getAll(this.#config)
    };


    /* ========== */


    // delete

    /**
     * 删除存储数据
     * 
     * @method delete
     * @param { string | null } [key] 要删除的数据的键名（可选），参数有效时删除对应的单条数据，参数无效时删除所有数据。
     * @returns { void } 无返回值
     */
    delete(key: string | null): void {
        if (isString(key))
            m_deleteItem(this.#config, true, key);
        else
            m_deleteItem(this.#config, false)
    };

    /**
     * 删除存储的单条数据
     * 
     * @method remove
     * @param { string } key 要删除的数据的键名
     * @returns { void } 无返回值
     */
    remove(key: string): void {
        m_deleteItem(this.#config, true, ValidateKey(this.#config, key, "remove"))
    };

    /**
     * 从本地存储中删除多条数据。
     * 
     * @method removeMany
     * @param { Array<string> } arr 包含需要删除的键的数组。
     * @returns { void } 无返回值
     */
    removeMany(arr: Array<string>): void {
        for (let key of ValidateArray<"string">(this.#config, arr, {
            type: "string"
        })) m_deleteItem(this.#config, true, key)
    };

    /**
     * 删除存储的所有数据
     * 
     * @method clean
     * @returns { void } 无返回值
     */
    clean(): void {
        m_deleteItem(this.#config, false)
    };
};