from docx import Document  # Word dosyasını okuma
from transformers import AutoTokenizer, AutoModel
import torch

# Word (.docx) dosyasından metni çıkaran fonksiyon
def extract_text_from_word(docx_path):
    doc = Document(docx_path)  # Word dosyasını aç
    text = "\n".join([para.text for para in doc.paragraphs])  # Tüm paragrafları birleştir
    return text.strip()

# Metni 512 token’lik parçalara bölen fonksiyon (max 512)
def split_text(text, tokenizer, max_tokens=512):
    tokens = tokenizer.encode(text, add_special_tokens=False)  # Metni token'lere çevir
    chunks = [tokens[i:i+max_tokens] for i in range(0, len(tokens), max_tokens)]  # 512'lik parçalar oluştur
    return [tokenizer.decode(chunk) for chunk in chunks]  # Tokenleri tekrar metne çevir

# Llama Modeli ile embedding oluşturan fonksiyon
def get_llama_embedding(text, model, tokenizer):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)

    embedding = outputs.last_hidden_state.mean(dim=1)  # Ortalama vektörü al
    return embedding.numpy()

# Ana işlem: Word'den metni al, parçalara böl, embedding oluştur
def process_word_document(docx_path):
    model_name = "sentence-transformers/all-MiniLM-L6-v2"  # Llama destekli SentenceTransformer modeli
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)

    # Word'den metni al
    text_data = extract_text_from_word(docx_path)

    # Metni parçala (512 sınır)
    text_chunks = split_text(text_data, tokenizer)

    # Her parça için embedding oluştur
    embeddings = [get_llama_embedding(chunk, model, tokenizer) for chunk in text_chunks]

    return embeddings  

# Kullanım
docx_path = "Siber_Güvenlik_Kanunu.docx"  
embedding_vectors = process_word_document(docx_path)

# Sonuçları göster
print("Toplam Parça Sayısı:", len(embedding_vectors))
print("İlk Parçanın Embedding Boyutu:", embedding_vectors[0].shape)



# Her bir embedding'in ilk birkaç değerini yazdır
for i, embedding in enumerate(embedding_vectors[:3]):  # İlk 3 embedding'i görüntüle
    print(f"Embedding {i + 1} Değerleri: {embedding.flatten()[:10]}...")  # İlk 10 değeri yazdır
