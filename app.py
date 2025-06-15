# app.py
import os
import json
from flask import Flask, render_template, jsonify, send_from_directory

app = Flask(__name__, static_folder="static", template_folder="templates")

# --- Definición de Rutas de Carpetas --- #
CarpetaData = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
CarpetaEstudiantes = CarpetaData
CarpetaIdioma = os.path.join(CarpetaData, 'conf')


# --- END POINT PARA INDEX --- #

@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")


# --- END POINT PARA PERFIL --- #

@app.route("/perfil")
@app.route("/perfil.html")
def perfil_general():
    return render_template("perfil.html")


# --- END POINT PARA OBTENER DATOS DE ESTUDIANTES (JSON y Fotos) --- #

@app.route('/students_list') 
def get_all_students_ids():
    student_ids = []
    try:
        for item in os.listdir(CarpetaEstudiantes):
            item_path = os.path.join(CarpetaEstudiantes, item)
            if os.path.isdir(item_path) and item.isdigit():
                student_ids.append(item)
        return jsonify(student_ids)
    except Exception as e:
        app.logger.error(f"Error al listar IDs de estudiantes: {e}")
        return jsonify({"error": f"No se pudo listar los IDs de estudiantes: {str(e)}"}), 500


# --- END POINT PARA ACCEDES A LOS DATOS DEL ESTUDIANTE --- #

@app.route('/<string:student_id>/perfil.json')
def get_student_profile(student_id):
    try:
        filepath = os.path.join(CarpetaEstudiantes, student_id, 'perfil.json')
        if not os.path.exists(filepath):
            app.logger.warning(f"Perfil no encontrado para el estudiante {student_id} en {filepath}")
            return jsonify({"error": "Perfil de estudiante no encontrado"}), 404

        with open(filepath, 'r', encoding='utf-8') as f:
            profile_data = json.load(f)
        return jsonify(profile_data)
    except Exception as e:
        app.logger.error(f"Error al cargar el perfil del estudiante {student_id}: {e}")
        return jsonify({"error": f"Error al cargar el perfil del estudiante: {str(e)}"}), 500


# --- END POINT PARA ACCEDER A LAS FOTOS ---#

@app.route('/<string:student_id>/<string:photo_filename>')
def get_student_photo(student_id, photo_filename):
    student_photo_dir = os.path.join(CarpetaEstudiantes, student_id)
    
    # Validar que el student_id sea numérico para evitar que se confunda con 'conf' o similares
    if not student_id.isdigit():
        return jsonify({"error": "ID de estudiante inválido"}), 400

    try:
        return send_from_directory(student_photo_dir, photo_filename)
    except FileNotFoundError:
        app.logger.warning(f"Foto '{photo_filename}' no encontrada para el estudiante {student_id} en {student_photo_dir}")
        return jsonify({"error": "Foto de estudiante no encontrada"}), 404
    except Exception as e:
        app.logger.error(f"Error al servir la foto {photo_filename} de {student_id}: {e}")
        return jsonify({"error": f"Error al servir la foto: {str(e)}"}), 500


# --- END POINT PARA CONFIGURAR IDIOMAS --- #

@app.route('/conf/<string:config_filename>')
def get_language_config(config_filename):
    try:
        filepath = os.path.join(CarpetaIdioma, config_filename)
        if not os.path.exists(filepath):
            app.logger.warning(f"Archivo de configuración de idioma no encontrado: {filepath}")
            return jsonify({"error": "Configuración de idioma no encontrada"}), 404

        with open(filepath, 'r', encoding='utf-8') as f:
            config_data = json.load(f)
        return jsonify(config_data)
    except Exception as e:
        app.logger.error(f"Error al cargar la configuración de idioma {config_filename}: {e}")
        return jsonify({"error": f"Error al cargar la configuración de idioma: {str(e)}"}), 500


# --- MAIN PARA APP DE FLASK ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)