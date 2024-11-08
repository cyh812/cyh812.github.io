import pandas as pd
import json  # 导入json模块

# 存储节点和连边数据的字典
data = {
    "nodes": [],
    "links": [],
    "categories": []
}

max_bet = 0

# 读取CSV文件
def read_csv(file_path):
    # 使用pandas读取csv
    df = pd.read_csv(file_path)
    return df

# 转换函数，将每一行的数据转化为节点格式
def convert_to_nodes(df):
    global max_bet  # Declare that we are modifying the global max_bet
    # 遍历DataFrame的每一行
    for _, row in df.iterrows():
        node = {}
        node['id'] = str(row[0])
        node['label'] = row[1]
        node['category'] = row[3]
        node['课程性质'] = row[4]
        node['课程体系'] = row[5]
        node['是否允许外院选课'] = row[6]
        node['上课语言'] = row[7]
        node['symbolSize'] = row[8]
        if row[14] > max_bet:
            max_bet = row[14]
        data["nodes"].append(node)

        cate = {"name":row[3]}
        if cate not in data["categories"]:
            data["categories"].append(cate)

    return data["nodes"]

def convert_to_links(df):
    # 遍历DataFrame的每一行
    for _, row in df.iterrows():
        link = {}
        link['source'] = str(row[0])
        link['target'] = str(row[1])
        data["links"].append(link)

    return data["links"]

# 主函数：读取CSV并转换数据，最后保存为JSON文件
def main(file_path1, file_path2, output_json_path):
    # 读取数据
    df1 = read_csv(file_path1)
    df2 = read_csv(file_path2)
    
    # 转换数据格式
    convert_to_nodes(df1)
    convert_to_links(df2)
    
    for i in data["nodes"]:
        i['symbolSize'] = min(max(i['symbolSize'] / max_bet * 20, 10), 20)
    # 将data字典输出为JSON文件
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)  # 格式化输出JSON，确保中文字符正确显示

# 文件路径：替换为你自己的CSV文件路径
file_path1 = "节点表格.csv"
file_path2 = "连边表格.csv"
output_json_path = "output_data.json"  # 输出JSON文件的路径

# 调用主函数
if __name__ == "__main__":
    main(file_path1, file_path2, output_json_path)
