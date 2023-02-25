import json
import codecs

# Open the JSON file in binary mode and read its contents
with open('db.json', 'rb') as f:
    json_data = f.read()

# Decode the JSON data to a Python dictionary
json_dict = json.loads(json_data)

# Encode the dictionary back to a JSON string encoded in UTF-8
utf8_json_data = json.dumps(json_dict, ensure_ascii=False)

# Open the output file in binary mode and write the UTF-8 encoded JSON data
with codecs.open('db.json', 'wb', encoding='utf-8') as f:
    f.write(utf8_json_data)
